package egovframework.let.uat.esm.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.ResponseCode;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.com.cmm.service.ResultVO;
import egovframework.com.jwt.EgovJwtTokenUtil;
import egovframework.let.uat.esm.service.EgovSiteManagerService;
import egovframework.let.utl.fcc.service.EgovStringUtil;
import egovframework.let.utl.sim.service.EgovFileScrty;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.Explode;
import io.swagger.v3.oas.annotations.enums.ParameterStyle;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import egovframework.com.cmm.LoginVO;
/**
 * 사이트관리자의 로그인 비밀번호를 변경 처리하는 컨트롤러 클래스
 * 
 * @author 공통서비스 개발팀
 * @since 2023.04.15
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일      수정자      수정내용
 *  -------            --------        ---------------------------
 *   2023.04.15  김일국          최초 생성
 *   2023.04.20  김일국          리액트에서 사용할 공통인증메서드 추가
 *   2024.07.17  김일국          @RequestParam 에서 @RequestBody로 변경
 *   2024.08.29  이백행          컨트리뷰션 롬복 생성자 기반 종속성 주입
 *      </pre>
 */
@Slf4j
@RestController
@Tag(name = "EgovSiteManagerApiController", description = "사용자 관리")
@RequiredArgsConstructor
public class EgovSiteManagerApiController {

	/** EgovSiteManagerService */
	private final EgovSiteManagerService siteManagerService;

	private final EgovJwtTokenUtil jwtTokenUtil;

	public static final String SECRET_KEY = EgovProperties.getProperty("Globals.jwt.secret");

	public static final String HEADER_STRING = "Authorization";

	/**
	 * 리액트에서 사이트관리자에 접근하는 토큰값 위변조 방지용으로 서버에서 비교한다.
	 * 
	 * 
	 * @param map데이터: String old_password, new_password
	 * @param request - 토큰값으로 인증된 사용자를 확인하기 위한 HttpServletRequest
	 * @return result - JWT 토큰값 비교결과 코드와 메세지
	 * @exception Exception
	 */
	@Operation(summary = "토큰값 검증", description = "Headers에서 Authorization 속성값에 발급한 토큰값 검증", security = {
			@SecurityRequirement(name = "Authorization") }, tags = { "EgovSiteManagerApiController" })
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "성공"),
			@ApiResponse(responseCode = "403", description = "인가된 사용자가 아님") })
	@PostMapping(value = "/jwtAuthAPI")
	public ResultVO jwtAuthentication(HttpServletRequest request) throws Exception {
		ResultVO resultVO = new ResultVO();

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		return resultVO;
	}

	/**
	 * 엑세스토큰 만료시 리프레시 토큰 검증 후 엑세스토큰 재발급
	 * @param param
	 * @param request
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value = "/refreshTokenAuth")
	public HashMap<String, Object> refreshTokenAuthentication(LoginVO loginVO, HttpServletRequest request) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		ResultVO resultVO = new ResultVO();
		// 토큰 가져옴
		String jwtToken = EgovStringUtil.isNullToString(request.getHeader(HEADER_STRING));
		Claims claims = Jwts.parser()
							.setSigningKey(SECRET_KEY)
							.parseClaimsJws(jwtToken)
							.getBody();

		// 디코딩된 값을 LoginVO에 세팅
		loginVO.setId(claims.get("id", String.class)); // 토큰에서 사용자 ID 추출
		loginVO.setName(claims.get("name", String.class)); // 토큰에서 이름 추출
		loginVO.setUserSe(claims.get("userSe", String.class)); // 사용자 구분 (예: "ADM", "USR")
		loginVO.setOrgnztId(claims.get("orgnztId", String.class)); // 조직 ID
		loginVO.setUniqId(claims.get("uniqId", String.class)); // 고유 ID	
		loginVO.setGroupNm(claims.get("groupNm", String.class)); // 그룹명

		resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
		resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		String newAccessToken = jwtTokenUtil.generateToken(loginVO);

		resultMap.put("resultVO", resultVO);
		resultMap.put("accessToken", newAccessToken);

		return resultMap;
	}


	/**
	 * 사이트관리자의 기존 비번과 비교하여 변경된 비밀번호를 저장한다.
	 * 
	 * @param map데이터: String old_password, new_password
	 * @param request - 토큰값으로 인증된 사용자를 확인하기 위한 HttpServletRequest
	 * @return result - 수정결과
	 * @exception Exception
	 */
	@Operation(summary = "비밀번호 변경", description = "사이트관리자의 기존 비번과 비교하여 변경된 비밀번호를 저장", security = {
			@SecurityRequirement(name = "Authorization") }, tags = { "EgovSiteManagerApiController" })
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "성공"),
			@ApiResponse(responseCode = "403", description = "인가된 사용자가 아님"),
			@ApiResponse(responseCode = "800", description = "저장시 내부 오류") })
	@PatchMapping(value = "/admin/password")
	public ResultVO updateAdminPassword(
			@Parameter(schema = @Schema(type = "object", additionalProperties = Schema.AdditionalPropertiesValue.TRUE, ref = "#/components/schemas/passwordMap"), style = ParameterStyle.FORM, explode = Explode.TRUE) @RequestBody Map<String, String> param,
			HttpServletRequest request, @Parameter(hidden = true) @AuthenticationPrincipal LoginVO user)
			throws Exception {
		ResultVO resultVO = new ResultVO();

		String old_password = param.get("old_password");
		String new_password = param.get("new_password");
		String login_id = user.getId();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("old_password", EgovFileScrty.encryptPassword(old_password, login_id));
		resultMap.put("new_password", EgovFileScrty.encryptPassword(new_password, login_id));
		resultMap.put("login_id", login_id);
		log.debug("===>>> loginVO.getId() = " + login_id);
		Integer result = siteManagerService.updateAdminPassword(resultMap); // 저장성공 시 1, 실패 시 0 반환
		log.debug("===>>> result = " + result);
		if (result > 0) {
			resultVO.setResultCode(ResponseCode.SUCCESS.getCode());
			resultVO.setResultMessage(ResponseCode.SUCCESS.getMessage());
		} else {
			resultVO.setResultCode(ResponseCode.SAVE_ERROR.getCode());
			resultVO.setResultMessage(ResponseCode.SAVE_ERROR.getMessage());
		}

		return resultVO;
	}
}
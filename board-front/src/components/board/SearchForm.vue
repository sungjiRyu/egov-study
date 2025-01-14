<template>
    <div class="search-container" >
        <div class="search-form">
            <q-select filled dense v-model="searchType" :options="options" @update:model-value="onChangeType"/>
            <q-input filled dense v-model="searchWord">
                <template v-slot:append>
                    <q-btn icon='check' flat round @click='onSearch' />
                </template>
            </q-input>
            <q-btn v-if="userStore.isLogin" to="/login" label="등록" />
        </div>
    </div>
</template>

<style scoped>
.search-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.search-form {
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 10px 50px 10px 50px;
}
</style>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useBoardStore } from '@/stores/board'

const props = defineProps({
  boardType: {
    type: String,
    required: true
  }
})

const userStore = useUserStore()
const boardStore = useBoardStore()

console.log('isLogin = ' + userStore.isLogin)

const searchWord = ref()

const searchType = ref()

const options = [
  { label: '제목', value: 0 },
  { label: '내용', value: 1 },
  { label: '작성자', value: 2 },
];

// 검색타입 변경시 스토어에 저장
const onChangeType = (newCategory) => {
  boardStore.searchCnd = newCategory.value
}

// 검색 버튼 클릭
const onSearch = async () => {
  const params = {
    bbsId: props.boardType,
    searchWrd: searchWord.value,
    searchCnd: boardStore.searchCnd,
    pageIndex: boardStore.pageIndex,
  }

  await boardStore.getBoardList(params);

}

</script>

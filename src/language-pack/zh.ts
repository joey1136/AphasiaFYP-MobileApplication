export const zh = {
    homeScreen: {
        title: "主頁",
        upload: "上傳照片至口語理解及認知訓練",
        upload2: "上傳照片及題目至自定義相簿",
        record: "查看自定義訓練的結果",
    },
    loginScreen: {
        title: "登入",
        successMessage: "已經成功登入!",
        wrongPasswordWarning: "密碼錯誤!",
        wrongEmailWarning: "請輸入有效電郵地址!",
        notRegisterWarning: "這個電郵地址尚未註冊! 你可以按此註冊此電郵地址",
    },
    registerScreen: {
        title: "註冊",
        email: "請輸入您的電郵地址",
        password: "請輸入你的帳戶密碼",
        successMessage: "已經成功註冊及登入!",
        duplicatedEmailWarning: "這個電郵地址已經被使用!",
        nonValidEmailWarning: "這不是正確電郵地址格式",
        nonValidPasswordWarning: "密碼必須包含至少6個字元",
        fullAccountWarning: "很抱歉，現在帳戶建立數目已超過上限，請向工作人員查詢",
    },
    profileScreen: {
        title: "我的帳戶",
        welcomeMessage: "歡迎",
        loginCodeMessage: "你的unity登入編號:",
        loginHints: "請先登入或註冊",
        login: "登入",
        register: "註冊",
        logout: "登出",
        logoutSuccessMessage: "你已經成功登出",
    },
    uploadScreen: {
        title: "上傳",
        select: "選擇照片",
        takeImage: "拍照",
        Object: [{ title: "相架", description: "請上傳放在相架裡的照片", url: "https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2FPhoto%20Frame.PNG?alt=media&token=0ff18052-9d10-499e-bfbc-aa58d1159b04" }],
    },
    customizedScreen: {
        title: "上傳自定義題目",
        Object: [{ title: "相簿封面", description: "請上傳一張照片作為相簿封面", url: "https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2FPhoto%20Frame.PNG?alt=media&token=0ff18052-9d10-499e-bfbc-aa58d1159b04" }],
        instructionQuestion: "訓練前的加油訊息",
        instructionQuestionDescription: "這個訊息將會於每次訓練前播放一次，預設訊息是 \"你好\"",
        question: "題目",
        questionPlaceholder: "請輸入題目",
        answer: "答案",
        answerPlaceholder: "請輸入答案",
        image: "照片",
        history: "歷史上傳記錄",
        nohistory: "沒有歷史上傳記錄",
        confirm: "確定",
        new: "新增",
        uploadSuccess: "上載成功",
        deleteModalTitle: "你是否確定刪除問題",
    },
    customizedTrainingRecord: {
        title: "查看自定義訓練的結果"
    },
    help: {
        title: "幫助"
    },
    toastMessage: {
        error: {
            title: "錯誤",
            loginErrorMessage: "請先登入",
            uploadCancelMessage: "上載中止",
        },
        success: {
            title: "成功",
            dataSetSuccessMessage: "題目已上載成功",
        }
    }
}
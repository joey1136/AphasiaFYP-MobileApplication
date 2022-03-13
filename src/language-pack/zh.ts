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
        Object: [{ title: "相架", description: "請上傳放在相架裡的照片", url: "https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2Fframe_image.PNG?alt=media&token=0d519deb-0bbc-4edf-897b-f67d84784b73" }],
    },
    customizedScreen: {
        title: "上傳自定義題目",
        Object: [{ title: "相簿封面", description: "請上傳一張照片作為相簿封面", url: "https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2Falbum_cover.PNG?alt=media&token=9214d6fa-879f-4422-99e6-febefb9940e4" }],
        instructionQuestion: "訓練前的加油訊息",
        instructionQuestionDescription: "這個訊息將會於每次訓練前播放一次，預設訊息是 \"你好\"",
        question: "題目",
        questionPlaceholder: "請輸入題目",
        answer: "答案",
        answerPlaceholder: "請輸入答案",
        image: "照片",
        history: "點擊查看歷史上傳記錄",
        nohistory: "沒有歷史上傳記錄",
        confirm: "確定",
        new: "新增",
        uploadSuccess: "上載成功",
        deleteModalTitle: "你是否確定刪除問題",
    },
    customizedTrainingRecord: {
        title: "查看自定義訓練的結果",
        correctRateTitle: "總正確率",
        noRecordPlaceholder: "未有訓練記錄",
        selectRecordPlaceholder: "您可以點選以上任一訓練記錄以查看詳細紀錄",
        tableIndexTitle: "記錄",
        tableTrainingTimeTitle: "訓練日期",
        tableCorrectTitle: "正確率",
        modalTitle: "訓練記錄",
        modalAnswer: "正確答案",
        correct: "正確",
        wrong: "錯誤",
        userAnswerTitle: "回答",
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
export const en = {
    homeScreen: {
        title: "Home Screen",
        upload: "Upload Images for Computerized Training",
        upload2: "Upload Images and Questions for Customized Album",
        record: "Check Training Record for Customized Album Training"
    },
    loginScreen: {
        title: "Login Page",
        successMessage: "User account signed in!",
        wrongPasswordWarning: "Wrong Password!",
        wrongEmailWarning: "This is not a valid Email Address",
        notRegisterWarning: "This email have not been registered",
    },
    registerScreen: {
        title: "Register Page",
        email: "Please enter your email",
        password: "Please enter your password",
        successMessage: "User account created & signed in!",
        duplicatedEmailWarning: "That email address is already in use!",
        nonValidEmailWarning: "This is not a valid Email Address",
        nonValidPasswordWarning: "This is not a valid Password",
        fullAccountWarning: "Sorry, the account creatation limit has expired, please contact staff",
    },
    profileScreen: {
        title: "Profile",
        welcomeMessage: "Welcome",
        loginCodeMessage: "Your Unity Login Code",
        loginHints: "Please Login",
        login: "Login",
        register: "Register",
        logout: "Logout",
        logoutSuccessMessage: "Logout Successfully",
    },
    uploadScreen: {
        title: "Upload",
        select: "Select",
        takeImage: "Take Picture",
        Object: [{ title: "Photo Frame", description: "Please select your image to put on the photo frame", url: "https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2Fframe_image.PNG?alt=media&token=0d519deb-0bbc-4edf-897b-f67d84784b73" }],
    },
    customizedScreen: {
        title: "Upload For Customized Album",
        Object: [{ title: "Book Cover", description: "Please select your image to put on the Book Cover", url: "https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2Falbum_cover.PNG?alt=media&token=9214d6fa-879f-4422-99e6-febefb9940e4" }],
        instructionQuestion: "Welcome message for your family",
        instructionQuestionDescription: "This message will play at the beginning of every training. Default Message is \"Hello\"",
        question: "Question",
        questionPlaceholder: "Please enter question",
        answer: "Answer",
        answerPlaceholder: "Please enter answer",
        image: "Image",
        history: "History Upload",
        nohistory: "No History Upload",
        confirm: "Confirm",
        new: "New ",
        uploadSuccess: " Upload successfully",
        deleteModalTitle: "Do you confirm to delete Question",
    },
    customizedTrainingRecord: {
        title: "Check Record for Cusomized Album Training",
        correctRateTitle: "Total correct rate",
        noRecordPlaceholder: "No Training Result",
        selectRecordPlaceholder: "You can select one of the record above to get detailed training result",
        tableIndexTitle: "Record",
        tableTrainingTimeTitle: "Training date, time",
        tableCorrectTitle: "Correct rate",
        modalTitle: "Training Record No",
        modalAnswer: "Default answer",
        correct: "Correct",
        wrong: "Wrong",
        userAnswerTitle: "User's response",
    },
    help: {
        title: "How to use this application"
    },
    toastMessage: {
        error: {
            title: "Error",
            loginErrorMessage: "Please first Login before upload",
            uploadCancelMessage: "Upload cancelled",
        },
        success: {
            title: "Success",
            dataSetSuccessMessage: "Question uploaded successfullly",
        }
    }
}
import { useState, useCallback } from "react";
import { SignUpTabsType } from "pages/SignUpBloggerPage/SignUpBloggerPage";
import SignUpFooter from "../SignUpFooter";
import styles from "./BloggerStudyAi.module.scss";
import { useMutationUpdateUser } from "../../../../hooks/mutations/useMutationUpdateUser";
import { useFetchMyProfile } from "../../../../hooks/query/useFetchMyProfile";
import {useMutationUpdateMessageBot} from "../../../../hooks/mutations/useMutationUpdateMessageBot";

interface BloggerStudyAiProps {
    setTabs: (value: SignUpTabsType) => void;
}

export default function BloggerStudyAi({ setTabs }: BloggerStudyAiProps) {
    const [customizeAiText, setCustomizeAiText] = useState("");
    const { updateMessageBotSettings } = useMutationUpdateMessageBot();
    const { user } = useFetchMyProfile();

    const handleTest = useCallback(() => {
        if (!customizeAiText.trim() || !user) return;

        updateMessageBotSettings({ userId: user.id, dto: {text: customizeAiText.trim() || ""} });
        setTabs("photo");
    }, [customizeAiText, user, updateMessageBotSettings, setTabs]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Customize your AI</h2>
            <textarea
                value={customizeAiText}
                onChange={(e) => setCustomizeAiText(e.target.value)}
                className={styles.textarea}
                placeholder="Tell us a little about yourself"
            />
            <SignUpFooter onClick={handleTest} />
        </div>
    );
}
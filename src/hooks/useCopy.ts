import { useCallback, useState } from 'react';

const useCopy = (text: string) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    try {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (e) {
      console.log(e);
    }
  }, [text]);

  return { isCopied, handleCopy };
};

export default useCopy;

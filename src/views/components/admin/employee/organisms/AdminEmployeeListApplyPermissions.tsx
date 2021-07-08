import { CustomDao } from "lib/dao/customDao";
import React, { useState } from "react";
import CommandButton from "views/components/common/molecules/CommandButton";
import LoadingScreen from "views/components/common/templates/LoadingScreen";

export default function () {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    setIsLoading(true);
    const result = await CustomDao.updateOwners();
    if (!result.isSuccess) {
      alert(`更新に失敗しました(${result.message})`);
      // eslint-disable-next-line no-console
      console.error(result);
    } else {
      alert("更新が完了しました");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <CommandButton onClick={onClick}>反映</CommandButton>;
}

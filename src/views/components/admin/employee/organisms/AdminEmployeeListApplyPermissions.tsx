import { message } from "antd";
import { createJobByAdmin } from "graphql/mutations";
import { JobDao } from "lib/dao/jobDao";
import React, { useState } from "react";
import CommandButton from "views/components/common/molecules/CommandButton";
import LoadingScreen from "views/components/common/templates/LoadingScreen";

export default function (): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    setIsLoading(true);
    try {
      // const result = await CustomDao.updateOwners();
      // if (!result.isSuccess) {
      //   alert(`更新に失敗しました(${result.message})`);
      //   // eslint-disable-next-line no-console
      //   console.error(result);
      // } else {
      //   alert("更新が完了しました");
      // }
      await JobDao.createByAdmin(createJobByAdmin);
      alert("社員情報変更を開始しました。処理結果はメールでお知らせします。");
    } catch (e: unknown) {
      if (e instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(e.message);
        message.error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <CommandButton onClick={onClick}>変更反映</CommandButton>;
}

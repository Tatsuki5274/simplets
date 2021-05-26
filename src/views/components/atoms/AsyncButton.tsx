import React from "react";
import { useState } from "react";
import { Button, ButtonProps } from "react-bootstrap";

/**
 * @description Bootstrapと同じ使い方でonClickへasync関数を渡すと処理が完了するまでの間はボタンをdisableにする
 * @param props BootstrapのButtonコンポーネントと同様のパラメータ
 * @returns 同期を管理するボタンコンポーネント
 * @example
 * <AyncButton
 *  onClick={async () => 何かの同期処理}
 * >ボタン</AsyncButton>>
 */
export default function AsyncButton(props: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (props.onClick) {
      setIsLoading(true);
      try {
        // クリック処理を同期実行する
        await props.onClick(event);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <Button {...props} onClick={onClick} disabled={isLoading}>
      {props.children}
    </Button>
  );
}

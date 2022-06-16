/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { message } from "antd";
import { SettingError } from "lib/exception";
import React from "react";

type PropsType = {
  children: JSX.Element;
};

type StateType = {
  hasError: boolean;
};

/**
 * @description レンダリング時に発生したエラーを処理するコンポーネント
 * @see https://ja.reactjs.org/docs/error-boundaries.html
 */
class ErrorBoundary extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): {
    hasError: boolean;
  } {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown): void {
    // You can also log the error to an error reporting service
    logError(error, errorInfo);

    console.error(error);
  }

  render(): JSX.Element & React.ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>予期せぬエラーが発生しました。</h1>;
    }

    return this.props.children;
  }
}

/**
 * @param error エラーオブジェクトを渡す
 * @param errorInfo エラーの情報を渡す
 * @description エラー発生時に通知をする仕組み(未実装)を提供する
 */
function logError(error: Error, errorInfo: unknown) {
  // Todo サービスにエラーを通知する処理を実装する
  console.error("catcher", error, errorInfo);
}

/**
 * @param error エラーオブジェクトを渡す
 * @example
 * try {
 *  throw new Error("サンプルエラー")
 * } catch (e) {
 *  catcher(e);
 * }
 */
export const catcher = async (error: Error): Promise<void> => {
  if (error instanceof Error) {
    message.error(error.message);
    logError(error, null);
  } else {
    throw new Error("不明なエラーです");
  }
};

export default ErrorBoundary;

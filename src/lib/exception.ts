import ExtensibleCustomError from "extensible-custom-error";
/**
 * @description ユーザーの操作によって発生したエラーに対して発生するエラー
 * @see https://github.com/necojackarc/extensible-custom-error
 * @example メッセージ付き
 * catch (error) {
 *  throw new UserError('message', error);
 * }
 * @example メッセージなし
 * catch (error) {
 *  throw new UserError(error);
 * }
 */
export class UserError extends ExtensibleCustomError {}

/**
 * @description システムに対する設定が原因で発生したエラー
 * @see https://github.com/necojackarc/extensible-custom-error
 * @example メッセージ付き
 * catch (error) {
 *  throw new SettingError('message', error);
 * }
 * @example メッセージなし
 * catch (error) {
 *  throw new SettingError(error);
 * }
 */
export class SettingError extends ExtensibleCustomError {}

/**
 * @description データの入出力に問題があり、発生した場合のエラー
 * @see https://github.com/necojackarc/extensible-custom-error
 * @example メッセージ付き
 * catch (error) {
 *  throw new IOError('message', error);
 * }
 * @example メッセージなし
 * catch (error) {
 *  throw new IOError(error);
 * }
 */
export class IOError extends ExtensibleCustomError {}

/**
 * @description 仕様を満たせない、仕様上制限している場合に発生するエラー
 * @see https://github.com/necojackarc/extensible-custom-error
 * @example メッセージ付き
 * catch (error) {
 *  throw new SpecificationError('message', error);
 * }
 * @example メッセージなし
 * catch (error) {
 *  throw new SpecificationError(error);
 * }
 */
export class SpecificationError extends ExtensibleCustomError {}

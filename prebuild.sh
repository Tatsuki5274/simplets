## バックエンドをビルドするためのスクリプトです。amplify buildでamplify.ymlに従って実行されます。

# プロジェクトルート
PROJECT_ROOT_DIR=`pwd`

echo "スクリプト開始"

# resolversの型定義の複製とトランスパイル
cd $PROJECT_ROOT_DIR
cd amplify/backend/function/resolvers/
cp "${PROJECT_ROOT_DIR}/src/API.ts" src/
cp -R "${PROJECT_ROOT_DIR}/src/graphql" src/
cp -R "${PROJECT_ROOT_DIR}/src/lib/dao" src/libs
npx tsc
echo "resolvers更新完了"

# dbStreamの型定義の複製とトランスパイル
cd $PROJECT_ROOT_DIR
cd amplify/backend/function/dbStream/
cp "${PROJECT_ROOT_DIR}/src/API.ts" src/
cp -R "${PROJECT_ROOT_DIR}/src/graphql" src/
cp -R "${PROJECT_ROOT_DIR}/src/lib/dao" src/libs
npx tsc
echo "dbStream更新完了"

# cp src/API.ts amplify/backend/function/resolvers/src
# cp -R src/graphql amplify/backend/function/resolvers/src/
# cd amplify/backend/function/resolvers
# npx tsc

# cp src/API.ts amplify/backend/function/dbStream/src
# cp -R src/graphql amplify/backend/function/dbStream/src/ #
# cd amplify/backend/function/dbStream
echo "スクリプト終了"
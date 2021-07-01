## バックエンドをビルドするためのスクリプトです。amplify buildでamplify.ymlに従って実行されます。

# プロジェクトルート
PROJECT_ROOT_DIR=`pwd`

echo "スクリプト開始"

# resolversの型定義の複製とトランスパイル
cd $PROJECT_ROOT_DIR
cd amplify/backend/function/resolvers/src/
npm i > /dev/null
cp "${PROJECT_ROOT_DIR}/src/API.ts" ./
cp -R "${PROJECT_ROOT_DIR}/src/graphql" ./
cp -R "${PROJECT_ROOT_DIR}/src/lib/dao" ./libs
./node_modules/.bin/tsc && echo "トランスパイル完了"
echo "resolvers更新完了"

echo
# dbStreamの型定義の複製とトランスパイル
cd $PROJECT_ROOT_DIR
cd amplify/backend/function/dbStream/src/
npm i > /dev/null
cp "${PROJECT_ROOT_DIR}/src/API.ts" ./
cp -R "${PROJECT_ROOT_DIR}/src/graphql" ./
cp -R "${PROJECT_ROOT_DIR}/src/lib/dao" ./libs
./node_modules/.bin/tsc && echo "トランスパイル完了"
echo "dbStream更新完了"

# cp src/API.ts amplify/backend/function/resolvers/src
# cp -R src/graphql amplify/backend/function/resolvers/src/
# cd amplify/backend/function/resolvers
# npx tsc

# cp src/API.ts amplify/backend/function/dbStream/src
# cp -R src/graphql amplify/backend/function/dbStream/src/ #
# cd amplify/backend/function/dbStream
echo "スクリプト終了"
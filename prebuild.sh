## バックエンドをビルドするためのスクリプトです。amplify buildでamplify.ymlに従って実行されます。

# プロジェクトルート
PROJECT_ROOT_DIR=`pwd`

echo "スクリプト開始"

#ビルド元ファイルと同一ディレクトリにビルドファイルが生成される形式
function build_v1(){
    cd $PROJECT_ROOT_DIR
    # cd amplify/backend/function/resolvers/src/
    cd $1"/src"
    npm i --legacy-peer-deps > /dev/null
    cp "${PROJECT_ROOT_DIR}/src/API.ts" ./
    cp -R "${PROJECT_ROOT_DIR}/src/graphql" ./
    cp -R "${PROJECT_ROOT_DIR}/src/lib/dao" ./libs
    ./node_modules/.bin/tsc && echo "トランスパイル完了"
}

#ビルド元ファイルと出力を分ける形式
function build_v2(){
    cd $1"/lib/"
    npm i --legacy-peer-deps > /dev/null
    cp "${PROJECT_ROOT_DIR}/src/API.ts" ./
    cp -R "${PROJECT_ROOT_DIR}/src/graphql" ./
    cp -R "${PROJECT_ROOT_DIR}/src/lib/dao" ./libs
    ./node_modules/.bin/tsc && echo "トランスパイル完了"
    cp -r node_modules ../src/
}

build_v1 "amplify/backend/function/resolvers"
echo "resolvers更新完了"
echo

build_v1 amplify/backend/function/dbStream
echo "dbStream更新完了"
echo

# build_v2 amplify/backend/function/updateOwner
# echo "updateOwner更新完了"
# echo

build_v1 amplify/backend/function/jobUpdateOwner
echo "job更新完了"

echo "スクリプト終了"
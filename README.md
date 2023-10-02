![Webpack](https://images.velog.io/images/yeoj1n/post/d7aea277-ab23-4f2a-a99c-d4e4c8da6abc/image.png)

# 學習 Webpack5 
- 學習日期 2023/10/2
- 學習資源 
    - 感謝布魯斯前端的免費教學影片 /  [【前端速成】Webpack5 快速入門｜Tiktok工程師帶你入門前端｜布魯斯前端](https://www.youtube.com/watch?v=uP6KTupfyIw&t=4828s)
## 大綱
- [1. 為什麼需要Webpack?](#為什麼需要Webpack?)   
- [2. 從零建立webpack前端專案](#從零建立webpack前端專案)     
    - 安裝 webpack
    - 安裝 webpack測試伺服器 webpack-dev-server
    - webpack.config.js 設置說明
        - Entry\Output 輸入與輸出點
        - devtool: 'source-map'
- [3. Loader 加載器](#Loader)
    - css-loader 
    - style-loader  內嵌CSS
    - sass-loader 
    - babel-loader 
- [4. Plugin 插件](#Plugin)    
    - html-webpack-plugin
    - MiniCssExtractPlugin 獨立CSS
- [5. webpack5 - Asset Modules 處理靜態資源檔案](#處理靜態資源檔案)   
    - 處理靜態資源檔案 
- [其他補充](#其他補充)     
    - Javascript模組化 Export / Import

## 1.為什麼需要Webpack?<a name="為什麼需要Webpack?"></a>
-   "Bundle" 是一個前端開發術語，它指的是將多個文件或模組合併為一個單獨的文件的過程。這個單獨的檔案包含了應用程式的所有必要程式碼和資源以便在瀏覽器中載入和運行，在前端開發中，通常使用打包工具（如Webpack、Parcel、Rollup等）來建立這些捆綁檔案。
-   Webpack提供了一種統一的方式來管理和打包前端資源轉換成HTML\CSS\JS，使開發過程更有效率和組織化。許多流行的前端框架和工具都與Webpack緊密整合(例如:Vue,React,Angular,tailwind等等)，以幫助開發者建立高效能的網路應用程式
-   Webpack主要作用是將多個前端資源檔案（如JavaScript、CSS、圖片等）打包成一個或多個最終的靜態資源文件，以便瀏覽器能夠載入和執行它們。

### Webpack核心流程
1. 安裝套件 `npm i webpack -D --sav-dev`，並在 Webpack.config.js 設置輸入輸出點
1. 在入口檔案index.js中引入JavaScript模組 
2. 運行Webpack `npm webpack --mode development`(可自行設定上限模式或是shortcut指令)，將index.js打包成bundle.js
3. 新增HTML檔案並載入Webpack生成的bundle.js
## 2.從零建立webpack前端專案<a name="從零建立webpack前端專案"></a>
1. 專案環境
    - node.js, npm
    - 安裝 webpack
        ```
        npm i webpack-cli --sav-dev
        npm i webpack -D --sav-dev
        ```
    - (選項) 安裝webpack測試伺服器        
        webpack-dev-server是一個用於開發環境的伺服器        
        可以在你開發時提供簡單的開發伺服器和自動重新載入（熱重載hot reload）功能。
        1. 安裝套件 `npm install -D webpack-dev-server`
        2. 參考 [DevServer | webpack官方文件](https://webpack.js.org/configuration/dev-server/#devserver) 在 webpack.config.js 內加入配置
            ```javascript
            $ webpack.config.js
            const path = require('path');

            module.exports = {
                //...
                devServer: {
                    static: {
                        directory: path.join(__dirname, 'dist'),
                    },
                    compress: true,
                    port: 9000,
                },
            };
            ```
        3. 設置npm指令`"dev": "webpack serve --mode development"` 就可以使用`$npm run dev` 打開測試伺服器了。
            ```
            {
                "scripts": {
                    "dev": "webpack serve --mode development",
                    "deploy": "webpack --mode production"
                },
            }
            ```
            -   說明：      
            在開發過程中，通常使用 webpack-dev-server 來提供檔案服務和熱重載功能，它會將產生的 bundle 檔案保存在記憶體中，不會在磁碟上產生實際的檔案。這樣可以提高開發效率，因為不必等待檔案寫入磁碟和瀏覽器刷新。 而在發布或部署應用程式時，執行類似 webpack --mode production 的命令，這會使用 webpack 設定檔產生實際的 bundle 文件，以便部署到生產環境使用。這時，你會產生真正的文件，用於在生產伺服器上提供應用程式。

2. webpack 打包流程
    - 新增專案入口"src"資料夾，在資料夾內新增index.js
        ```
        console.log("hello");
        ```
    - 設定package.json指令，然後執行`npm run build`  
        ```
        "scripts": {"build": "webpack  --mode production"}
        ```
    - 目錄會添加 dist/main.js
        - 說明：專案的入口檔案 src/index.js 中的所有 JavaScript 檔案被打包成一個單獨的 JavaScript 檔案並輸出到 dist/main.js

3. 新增檔案命名為`webpack.config.js` 並進行相關設置
    - [官方文件](https://webpack.js.org/concepts/).-
    - Webpack的核心概念
        1. Entry \Output  輸入與輸出點
            ```
            const path = require('path');
            module.exports = {
                entry: './src/index.js',
                output: {
                    path: path.resolve(__dirname, 'dist'),
                    filename: 'main.bundle.js',
                },
            };
            ```
        2. Loaders 
            - Loader主要是幫助Webpack讀取和將檔案轉換為模組以整合到Webpack的打包流程中。
        3. Plugins
            - Plugin主要是幫助Webpack進行輸出和其他建置任務。
        4. Mode
            - 開發模式(程式碼不會被壓縮)
            - 上縣模式
        5. Browser Compatibility
            - 瀏覽器相容性
    - source-map 生成带有映射源代碼的檔案       
        - 幫助開發者在偵錯和錯誤追蹤時將編譯後的程式碼映射回原始原始碼，以提升開發效率。
        - 設置方式
            ```
            $webpack.config.js
            module.exports = {
            // ...其他配置...
            devtool: 'source-map', 
            };
            ```
        - 運行後Console代碼旁就會出現這段code是來自哪個來源檔案
## 3.Loader 加載器<a name="Loader"></a>
1. 為什麼需要loader 
    - 因為webpack預設只讀得懂javascript，需要藉由loader將各種類型文件轉換成模組，以便引入到文件中進行處理。舉例：
        1. 新增 ./src/index.css，並於index.js 中載入 index.css
            ```
            import "./index.css";
            ```
        2. 如果沒有安裝loader會報錯
            ```
            ERROR in ./src/index.css 1:1
            Module parse failed: Unexpected token (1:1)
            You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
            > p{
            |     color: blueviolet;
            | }
            @ ./src/index.js 24:0-21
            ```
2. 在 webpack專案中使用 loader
    - CSS
        1. 安装必要的loader和Plugin。
        `npm i css-loader style-loader --save-dev`     
        2. 配置Webpack
            ```javascript
            module.exports = {
                module: {
                    rules: [
                        {
                            test: /\.css$/i,
                            use: ["style-loader", "css-loader"],
                        },
                    ],
                },
            };
            ```
        3. 新增 ./src/index.css，並於index.js 中載入 index.css
            ```
            import "./index.css";
            ```
    - SASS
        1. 安装必要的loader和Plugin。
        `npm install style-loader css-loader sass-loader sass --save-dev`     
        2. 配置Webpack
            ```javascript
            module.exports = {
                module: {
                    rules: [
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                        ],
                    },
                    ],
                },
            };
            ```
        3. 新增 ./src/index.scss，並於index.js 中載入 index.scss
            ```
            import "./index.scss";
            ```
    - babel-loader
        - 什麼是Babel
            - Babel是用於JavaScript程式碼轉譯（transpilation）的開源工具。 它的主要目的是將新版本的JavaScript程式碼轉換為舊版本，以確保在不同瀏覽器和環境中都能夠正常運作，使開發者能夠在編寫JavaScript程式碼時使用最新的語法和特性而不必擔心相容性問題。 
            - 它被廣泛用於建立工具（如Webpack和Rollup）、前端框架（如React、Vue和Angular）以及許多開源專案和企業應用程式中。
        - 在 webpack專案中使用 [babel](https://webpack.js.org/loaders/babel-loader/)
            1. 安装必要的loader和Plugin。
            `npm install  babel-loader @babel/core @babel/preset-env -D`  
            2. 配置Webpack
                ```javascript
                $ webpack.config.js
                module: {
                rules: [
                    {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    }
                    }
                ]
                }
                ```
            3. 根據不同的建置目標（target）來自訂Babel的配置
                1. 在根目錄新增 babel.config.js
                    ```javascript
                    $ babel.config.js
                    {
                        presets: ['@babel/preset-env']
                    }
                    ```

            4. 運行 webpack
                - 在".src/index.js"中新增較新的JS語法，以類別私有變數為例
                    ```javascript
                    $ ".src/index.js"
                    // 測試babel
                    class Test { #a = 1 }
                    const tt = new Test()
                    console.log('tt.a',tt.a);
                    ```
                - 運行後應該能夠成功在輸出的"bundle-[hash].js"看到編譯後的代碼
                    ```javascript
                    const l=new class{#o=1};console.log("tt.a",l.a)})();
                    ```
                    也可以看到console.log('tt.a',tt.a)打印結果
                    ```
                    tt.a undefined
                    ```
## 4.Plugin 插件<a name="Plugin"></a>
1. 為什麼需要Plugin
    - Plugin用於Webpack建置過程中執行各種任務，幫助Webpack完成打包、最佳化等工作。
    - 舉例：
        1. 希望讓使用者瀏覽頁面的時候都重新請求頁面而不是使用緩存，因此我們在`webpack.config.js`裡進行 output設置在檔名加入`[hash]`，生成的js檔案名稱會像是這樣 `bundle-47bf7421d3f798619a81.js`。
            ```javascript
            $ webpack.config.js
            const path = require('path');
            module.exports = {
                entry: './src/index.js',
                output: {
                    path: path.resolve(__dirname, 'dist'),
                    filename: 'bundle-[hash].js',
                },
            };
            ```
        2. 此時index.html會讀取不到bundle-[hash].js，因此需要使用到相關插件`html-webpack-plugin`。
2. 在 webpack專案中使用 Plugin
    - [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)
        1. 安装必要的loader和Plugin。
        `npm i html-webpack-plugin --save-dev`    
        2. 配置Webpack
            ```javascript
            $ webpack.config.js
            const HtmlWebpackPlugin = require('html-webpack-plugin');
            // const path = require('path');
            module.exports = {
                /* entry: 'index.js',
                output: {
                    path: path.resolve(__dirname, './dist'),
                    filename: 'index_bundle.js',
                }, */
            plugins: [new HtmlWebpackPlugin({
                template:"./src/index.html"
            })],
            };
            ```
        3. 運行後會發現 輸出的index.html會自動添加 已經調整過的js檔名 `<script defer="" src="bundle-7a6cf6fd2220ea6c962a.js"></script>`
        4. 同時我們也可以把 "./src/index.html"檔案內 原本載入bunddle的程式碼移除。

    - [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)
        1. 安装必要的loader和Plugin。
        `npm i mini-css-extract-plugin --save-dev`  
        2. 配置Webpack
            ```javascript
            $ webpack.config.js
            const MiniCssExtractPlugin = require("mini-css-extract-plugin");
            
            module.exports = {
                module: {
                    rules: [{
                        test: /\.s[ac]ss$/i,
                        use: [
                        MiniCssExtractPlugin.loader,
                        // 不需要 "style-loader",
                        "css-loader",
                        "sass-loader",
                        ],
                    },],
                },
            plugins: [
                new MiniCssExtractPlugin({ 
                filename: 'main-[hash].css'
                })
            ],
            };
            ```
            - 如果你在設定中使用了MiniCssExtractPlugin.loader，就表示你想要將CSS提取到獨立的檔案中，而不需要將樣式內聯到JavaScript檔案中，因此不再需要style-loader。            
                - style-loader的作用        
                style-loader是Webpack Loader，主要作用是將CSS樣式透過JavaScript插入HTML頁面中。 這意味著在建置過程中，它會將樣式以內聯方式插入到產生的JavaScript檔案中，然後透過JavaScript將樣式套用到頁面。
                這種方式適用於開發環境，因為它能夠實現熱模組替換（Hot Module Replacement，HMR），允許樣式變更在不刷新整個頁面的情況下立即生效。     

                - MiniCssExtractPlugin.loader的作用      
                MiniCssExtractPlugin用於將CSS樣式提取到獨立的CSS檔案中，而不是將樣式內聯到JavaScript檔案中。        
                當你使用MiniCssExtractPlugin.loader時，它會將CSS樣式提取到單獨的CSS檔案中，而不再將樣式內聯到JavaScript檔案中。 這通常用於生產環境，因為它可以減小CSS文件的大小，並允許瀏覽器快取樣式文件，提高頁面載入效能。
        3. 運行webpack之後就會在"./dist"看到獨立的css檔案，輸出的index.html會自動添加`<link href="main-81bcbfe8bc9862506743.css" rel="stylesheet">`。

## 6. webpack5 - Asset Modules 處理靜態資源檔案 <a name="處理靜態資源檔案"></a>
Webpack 5引入了一項名為"[Asset Modules](https://webpack.js.org/guides/asset-modules/)"的新功能，它是用於處理各種靜態資源檔案的機制。 Asset Modules允許你將各種類型的文件（如圖像、字體、音訊、視訊等）作為模組導入到你的JavaScript程式碼中，這樣可以更輕鬆地管理和處理這些資源，而不必擔心手動配置和維護加載器。

1. 把素材 `gif01.gif` 或 `jpg01.jpeg` 透過 `./src/index.scss`嵌入
    ```css
    $ ./src/index.scss
    div{
        width: 600px;
        height: 400px;
        // background-color: rgb(221, 255, 127);
        background-image: url("./gif01.gif");
        background-position: top ;
        background-size: cover;
        margin: 20px 0;
    }
    ```
2. 設置webpack
    ```javascript
    $ webpack.config.js
    const path = require('path');

    module.exports = {
    /*entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },*/
    module: {
        rules: [{
            test: /\.png/,
            type: 'asset/resource'
            }]
        },
    };
    ```



## 其他補充 <a name="其他補充"></a>

### Javascript模組化 Export / Import 
```javascript
$ index.js
// 預設匯出 的引入方式
import data from "./export1.js";

// 具名匯出 的引入方式
import {c,add} from "./export2.js";

console.log(data.total);
console.log(c);
```
```javascript
$ export1.js // 預設匯出
let a = 1;
let b = 2;

export default {
    "a":a,
    "b":b,
    "total":a+b
};
```
```javascript
$ export2.js // 具名匯出
export const c = 1;
export function add(x,y){
    return x+y;
}
```

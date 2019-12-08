# Repo Search demo

查詢github的repositories，並將結果顯示在下方列表。

Heroku首次開啟時間稍慢，需花些時間等候:

[Demo](https://repo-search-demo.herokuapp.com/) 

**專案目標：**

1. 自製InfiniteScroll
2. 查詢github repositories
3. 搜尋的關鍵字需即時回傳結果（需考慮github api的rate limit）

**本專案包含以下內容：**

1. 使用eslint (airbnb) 做coding style管理
2. 部分元件可透過storybook單獨展示
3. repo search的主體被切割成RepoSearchContent與RepoSearchInput，並將查詢的關鍵字儲存在redux，使搜尋輸入與搜尋結果能分開放置在任意不同的component。
4. 自製InfiniteScroll，能自由修改延遲時間，避免user暴力操作，導致更新資料過度頻繁。
5. search input具有格式驗證功能，從ui層避免注入攻擊。
6. 自製轉換日期格式的lib: DateFormat
7. 自製捲軸滾動事件相關操作的lib: scroll

## 内容列表

- [安裝與使用](#安裝與使用)
- [架構說明](#架構說明)
    + [資料夾結構](#資料夾結構)
    + [RepoSearch](#reposearch)
    + [RepoSearchInput](#reposearchinput)
        + [ValidatorHoc](#validatorhoc)
        + [ImmediateSubmitSearchInput](#immediatesubmitsearchinput)
    + [RepoSearchContent](#reposearchcontent)
        + [InfiniteScroll](#infinitescroll)

## 安裝與使用

下載完後，安裝、執行即可開啟網頁。


```
$ npm install
$ npm start
```


storybook 啟動方式 (storybook初始化過程稍慢，請耐心等候)

```
$ npm run storybook
```


## 架構說明

為了讓程式碼能夠更有效的重複利用，故採用元件化的開發方式。每個部分皆有盡量考慮去除耦合性的辦法。

**可以在RepoSearch了解我使用redux的原因，並在ValidatorHoc了解我利用hoc去除耦合以及提高擴展性的實際作法。**

### 資料夾結構

1. js
    * apis:  
        *  放置api
    * components: 
        * react的部分主要寫在components裡面。
        * content放會產生出頁面的部分，common放共用以及被引入的部分。
    * configs
        * 配置相關的寫這邊，比如：驗證規則、domain name。
    * libs
        * 純js的小工具放這邊（如果允許使用外部的lib，也會放這裡）。
    * stores
        * redux的reducer跟action
2. styles
    根據bootstrap改寫的scss
    * base
        * html tag相關的預設定，從這邊改寫
    * components
        * 以元件為單位的css放這邊，比如search-input.scss
    * helps
        * 可以套用在任意css上的小工具或參數設定，比如border-radius
    * layouts
        * 以頁面排版為單位的css放這邊，比如header,container

### RepoSearch

**使用redux的原因：**

參考了很多網站的設計，發現search input被放在header的情況很多，且有些需要根據不同頁面搜尋不同內容。

因此將搜尋輸入與搜尋結果拆分成RepoSearchInput與RepoSearchContent兩個元件。因為考量到header元件與其他元件的位置可能差距很遠，所以決定使用redux儲存搜尋的關鍵字。

### RepoSearchInput

這個元件主要處理searchInput的關鍵字儲存位置。以及設定searchInput的顏色。
透過這種方式，可以解耦searchInput與redux的關聯性，如此一來若有不同的searchInput需求時，就不需要重寫一個類似的元件。

header中的searchInput，在下一次改版（如果有持續更新的話）會根據不同頁面做不同的搜尋。

因此將searchInput包裹在RepoSearchInput裡面。

**未來header有新需求時，可以：**

1. 利用網址判斷要render RepoSearchInput或別的component
2. 若僅僅是判斷網址後，儲存到redux的不同store，則直接改寫RepoSearchInput的儲存條件即可。

### ValidatorHoc

驗證searchInput的關鍵字，有符合規則才將值傳到外層。
這是根據裝飾者模式的設計理念寫的component，目的是在不動到原本元件的情況下加上新的功能。

驗證規則這部分並不是每個網站都需要，畢竟sql injection等注入攻擊，有些會在後端才考慮。

因此如果覺得多餘，可刪除此元件。

改成直接import SearchInput也不會影響整體功能。

此外驗證的規則也是選填的，所有的規則都放在config的validator rule裡面，如此可以根據不同需求加入不同的驗證條件，且不需改動原本的元件。

### ImmediateSubmitSearchInput

輸入即搜尋的input。

為求變通性，我建立了SearchInput的資料夾。未來若有需要「點擊搜尋」，只需實作有相同接口的component，即可放入ValidatorHoc且不會出錯。

#### RepoSearchContent

這元件主要任務為取得search text的關鍵字、呼叫github的api取得資料、將資料轉交由InfiniteScroll實現。

**切割出InfiniteScroll元件的原因：**

    1. InfiniteScroll是極為容易被重複利用的component，沒有道理不分開來寫。
    2. 由於取api的方式與pagination取得方式類似，因此預留些變動的彈性，未來若想將InfiniteScroll改成Pagination，可以將變動的範圍縮到最小。
    3. 若將InfiniteScroll直接寫在此元件之中，則任務太多，必須想辦法，盡量讓職責單一，以提高後續的維護性。

**降低即時查詢觸發api rate limit的辦法：**

    注意到fetchDataFromGitHub這個function我是使用recursive的方式去寫，並在其中加上一個setTimeout，去異步的delay時間。

    由於ImmediateSubmitSearchInput會連同輸入的過程一併視為關鍵字儲存。且github的api有rate limit，不能一直去打api，
    
    因此我透過異步的delay，去取得delay前與delay後的searchText，若是兩者不一樣，代表短時間內存在連續輸入，也就是說user還沒輸入完資料，需繼續等待。
    透過這種方式能大幅減少api查詢的次數，使得即時查詢得以實現。
     
### InfiniteScroll

**實作方式：**

簡單來說，來源資料放在resourceList，渲染資料放在renderList，透過Array.shift去取得resourceList的第一筆資料，push進renderList中。
如果有新增資料則push進resourceList，當resourceList沒有資料則代表資料到底了。

這裡值得注意的是，我將下一次取得資料的請求與資料如何渲染的樣式，做成兩個對應的接口 (  updateResourceList, renderItem
)，如此一來InfiniteScroll不需要關心如何取得資料，也不需要關心資料如何呈現，降低需要去變動這個元件的機會。
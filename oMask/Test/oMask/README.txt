版本說明:
V0.93
1. Config.html OHA_GetTitle/OHA_GetModel加入 return.
V1.11
1. 加上Cookie功能
V1.12
1.   修改Pause後Stop, 會將Strength reset回1
V1.13
1.   修改Start output時, 要設定強度。
V1.15
1. 移除RunErr時, 讓客戶看不懂的訊息..
V1.16
1. 修改Android4.4以下, Title/Subtitle中文會有問題的Bug
V1.17, V1.175
1.  修改Test mode, 可以切換是否自動記錄之前的強度。
V1.18
1. 修改sendOhaCmd的return value, 用'%_'取代'_', 用'%%'取代'%'
V1.19
1. 支援多語系
2. 移除未Start前, 不能設定強度的問題
V1.20
1. 修改Cookie無法使用的問題
V1.21
1. 增加OHA_Lock/OHA_Unlock command
V1.22
1. 修改多語系, userAgent改為在尾端append";_en"(以English為例)
V1.221
1. 修改簡中多了一個請插入裝置的訊息
V1.230
1. 修改SendSound在剛開啟網頁時不會啟動
V1.240
1. Support oMass使用說明及設定畫面由網頁呼叫。
V1.250
1. 於連結內部網頁的指令加入OHA_Local=true的參數

使用說明:
1.	Config.html/Default.html所在的位置為Root directory, 自root directory位置將所有檔案壓縮成
	zip file, 下載至Android裝置上。
2.	Android安裝OHA app, 安裝完畢後, 勾選注意事項與使用條款進入主頁面。
3.	於App主頁面下方有一個加入頁面按紐, 按下後, 選取先前下載至裝置的.zip檔, 即可開啟頁面。
4.	完成上述測試後, 請將下載的.zip檔解壓縮至工作電腦的目錄, 如c:/work/, 內容為網頁型式, 網頁啟始檔案為default.html。
5.	修改網頁內容(啟動頁面必須維持為default.html), 
6.	修改Config.html, 內容記錄版本, Model Name(辨認相容硬體), Page Name以及App所需要的Title/Subtitle等。
Note 1: Model Name是用來辨別硬體用, Page Name是用來辨別頁面是否相同, 若頁面不同, 雖為同樣的Model Name, OHA App也會產生不同的頁面連結。
7.	更新Icon及Tab icon, 位於工作目錄的./img下, 檔名分別是
Icon: img/icon.png(200x200)
Tab Active icon: img/tab_icon_act.png(144x144)
Tab Inactive icon: img/tab_icon_inact.png(144x144)
8.	完成修改工作後, 將工作目錄壓縮成.zip檔.(注意!! Config.html/default.html需在解開的根目錄上)
9.	上傳至網路或雲端硬碟, 再下載至裝置上, 或利用隨身碟連結至裝置。
10.	於主頁面下方有一個加入頁面按紐, 按下後, 選取先前下載至裝置的.zip檔, 即可開啟客製之專屬頁面。

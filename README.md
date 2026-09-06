# Dリーグ 画像認識 AR

Mind-AR を使い、カメラ映像からロゴと選手写真を認識して、その位置に日本語ラベルを重ねる静的サイトです。GitHub Pages で公開できます。

## 認識内容

| 対象 | 画像 | 表示 |
| --- | --- | --- |
| ロゴ | `D_Logo.jpg` | ロゴを認識 |
| 選手 | `D_player.png` | 選手を認識 |

## 使い方

1. スマートフォンの **Safari または Chrome** でこのサイトを開く（LINE などのアプリ内ブラウザは不可）
2. 「カメラを起動」を押してカメラ利用を許可する
3. 画面のロゴ、または選手の写真にカメラを向ける

iPhone で以前拒否した場合は、**設定 → Safari → カメラ** でこのサイトを許可に戻してください。

PC でも動作しますが、印刷物や別端末に表示した画像へカメラを向ける方が認識しやすいです。

## GitHub Pages への公開

1. このフォルダを GitHub リポジトリに push する
2. リポジトリの **Settings → Pages**
3. **Source** を `Deploy from a branch` にする
4. Branch を `main`（または `master`）、フォルダを `/ (root)` にして Save

公開 URL の例:

```text
https://<user>.github.io/<repo>/
```

カメラは HTTPS でのみ使えます。GitHub Pages はそのまま HTTPS になるので追加設定は不要です。

## ファイル構成

- `index.html` … AR 本体。開始画面とカメラ認識
- `targets.mind` … Mind-AR 用にコンパイルした認識データ
- `D_Logo.jpg` / `D_player.png` … 認識対象の元画像
- `compile.html` … `targets.mind` を作り直す補助ページ

`targets.mind` 内の順番は次の通りです。

- `targetIndex: 0` … ロゴ
- `targetIndex: 1` … 選手

## 認識データを作り直す場合

ローカルで HTTP サーバを起動し、`compile.html` を開いて「コンパイルしてダウンロード」を押します。

```bash
python3 -m http.server 8080
```

完了後、ダウンロードした `targets.mind` をこのフォルダに上書きしてください。

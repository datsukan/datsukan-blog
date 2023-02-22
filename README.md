<p align="center">
  <a href="https://blog.datsukan.me">
    <img alt="datsukan" src="https://raw.githubusercontent.com/datsukan/datsukan-blog/main/src/images/avatar-transparent.png" width="80" />
  </a>
</p>
<h1 align="center">
  datsukan blog
</h1>

[Gatsby's blog starter](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog)をベースに作成された datsukan のブログです。

https://blog.datsukan.me

## 🚀 Quick start

1. **ソースを取得する**

   ```shell
   git clone https://github.com/datsukan/datsukan-blog.git
   ```

2. **ローカル開発環境を起動する**

   ```shell
   cd datsukan-blog/
   yarn dev
   ```

3. **ローカル開発環境へアクセスする**

   ブログページ： `http://localhost:8000`  
   GraphQL の確認ページ： `http://localhost:8000/___graphql`

## 🧐 What's inside?

### Library

- tailwindcss
- postcss
- postcss-import
- prismjs
- fortawesome
- heroicons
- twemoji
- autoprefixer
- highlight.js
- axios
- cheerio
- unified
- remark-parse
  - remark-breaks
  - remark-gfm
  - remark-directive
- remark-rehype
  - rehype-highlight
  - rehype-slug
- rehype-react
- date-fns
- dotenv
- prettier
- gatsby
  - gatsby-plugin-google-gtag
  - gatsby-plugin-image
  - gatsby-source-filesystem
  - gatsby-transformer-sharp
  - gatsby-plugin-sharp
  - gatsby-plugin-manifest
  - gatsby-plugin-react-helmet
  - gatsby-source-contentful
  - gatsby-plugin-postcss
  - gatsby-plugin-alias-imports
  - gatsby-plugin-provide-react
  - gatsby-plugin-sitemap
  - gatsby-plugin-web-font-loader

### Top level directories

※[Gatsby's blog starter](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog)の内容を機械翻訳しているだけです

Gatsby プロジェクトに表示されるトップレベルのファイルとディレクトリをざっと見てみましょう。

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: このディレクトリには、プロジェクトが依存するコードのすべてのモジュール（npm パッケージ）が自動的にインストールされます。

2.  **`/src`**:このディレクトリには、サイトヘッダーやページテンプレートなど、サイトのフロントエンドに表示されるもの（ブラウザに表示されるもの）に関連するすべてのコードが含まれます。 src は「ソースコード」の略称です。

3.  **`.gitignore`**: このファイルは、バージョン履歴を追跡しない/維持しないファイルを git に通知します。

4.  **`.prettierrc`**: これは、Prettier の構成ファイルです。 Prettier は、コードのフォーマットの一貫性を保つのに役立つツールです。

5.  **`gatsby-browser.js`**: このファイルは、Gatsby が[Gatsby browser APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/)（存在する場合）の使用法を見つけることを期待している場所です。これらにより、ブラウザに影響を与えるデフォルトの Gatsby 設定のカスタマイズ/拡張が可能になります。

6.  **`gatsby-config.js`**: これは、Gatsby サイトのメインの構成ファイルです。ここで、サイトのタイトルや説明、含める Gatsby プラグインなど、サイトに関する情報（メタデータ）を指定できます（詳細については、[構成ドキュメント](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/)を確認してください）。

7.  **`gatsby-node.js`**: このファイルは、Gatsby が[Gatsby Node APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/)（存在する場合）の使用法を見つけることを期待している場所です。これらにより、サイト構築プロセスの一部に影響を与えるデフォルトのギャツビー設定のカスタマイズ/拡張が可能になります。

8.  **`gatsby-ssr.js`**: このファイルは、Gatsby が[Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/)（存在する場合）の使用法を見つけることを期待している場所です。これらにより、サーバー側のレンダリングに影響を与えるデフォルトの Gatsby 設定をカスタマイズできます。

9.  **`LICENSE`**: このプロジェクトは MIT ライセンスです。ライセンスの表示として配置しています。

10. **`package-lock.json`** （最初に、以下の package.json を参照してください）。これは、プロジェクトにインストールされた npm 依存関係の正確なバージョンに基づいて自動的に生成されたファイルです。 （このファイルを直接変更することはありません）

11. **`package.json`**: Node.js プロジェクトのマニフェストファイル。メタデータ（プロジェクトの名前、作成者など）などが含まれます。このマニフェストは、npm がプロジェクトにインストールするパッケージを知る方法です。

12. **`README.md`**: プロジェクトに関する有用な参照情報を含むテキストファイル。

### Directories in src

src ディレクトリ内のディレクトリ構成をざっと見てみましょう。

    src/
    ├── components
    ├── css
    ├── fonts
    ├── images
    ├── layouts
    ├── pages
    ├── templates
    └── utils

1. **`components`**: UI のパーツとなるコンポーネントのディレクトリです。

2. **`css`**: PostCSS で記述された各種 CSS ファイルのディレクトリです。

3. **`fonts`**: サイトに適用するフォントファイルのディレクトリです。

4. **`images`**: 画像ファイルのディレクトリです。

5. **`layout`**: ページのレイアウト（枠組み）となるコンポーネントのディレクトリです。

6. **`pages`**: 基本的な固定ページとなるコンポーネントのディレクトリです。

7. **`templates`**: Gatsby によって動的にレンダリングされるページのベースとなるコンポーネントのディレクトリです。

8. **`utils`**: 各コンポーネントで使用される処理を役割ごとに切り出したスクリプトのディレクトリです。

## 💫 Deploy / デプロイ

main ブランチへ push すると Vercel へ自動デプロイされます。

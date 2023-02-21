import type { PageProps } from "gatsby"
import { DefaultLayout } from "@layouts/default"
import { Seo } from "@components/Seo"

type LinkProps = {
  label: string
  url: string
}
const Link = ({ label, url }: LinkProps) => {
  return (
    <a
      className="text-link hover:underline"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  )
}

type GoogleAdProps = {
  className?: string
}
const GoogleAd = ({ className = "" }: GoogleAdProps) => {
  return (
    <div className={className}>
      <h3 className="mb-3 text-lg font-bold">Googleアドセンス</h3>
      <p>
        当ブログでは、第三者配信の広告サービス「Google
        Adsense（グーグルアドセンス）」を利用しています。
        <br />
        広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
        <br />
        Cookieを無効にする設定およびGoogleアドセンスに関する詳細は、
        <Link
          label="広告 – ポリシーと規約 – Google"
          url="https://policies.google.com/technologies/ads"
        />
        をご覧ください。
      </p>
    </div>
  )
}

type AmazonAdProps = {
  className?: string
}
const AmazonAd = ({ className = "" }: AmazonAdProps) => {
  return (
    <div className={className}>
      <h3 className="mb-3 text-lg font-bold">Amazon アソシエイト</h3>
      <p>
        Amazonのアソシエイトとして、当ブログは適格販売により収入を得ています。
      </p>
    </div>
  )
}

type AdProps = {
  className?: string
}
const Ad = ({ className = "" }: AdProps) => {
  return (
    <div className={className}>
      <h2 className="mb-5 text-xl font-bold">広告の配信について</h2>
      <GoogleAd />
      <AmazonAd className="mt-5" />
    </div>
  )
}

type GoogleAnalyticsProps = {
  className?: string
}
const GoogleAnalytics = ({ className = "" }: GoogleAnalyticsProps) => {
  return (
    <div className={className}>
      <h3 className="mb-3 text-lg font-bold">Googleアナリティクス</h3>
      <p>
        当ブログでは、Googleによるアクセス解析ツール「Google
        Analytics（Googleアナリティクス）」を利用しています。
        <br />
        このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。
        <br />
        トラフィックデータは匿名で収集されており、個人を特定するものではありません。
      </p>
    </div>
  )
}

type AnalysisProps = {
  className?: string
}
const Analysis = ({ className = "" }: AnalysisProps) => {
  return (
    <div className={className}>
      <h2 className="mb-5 text-xl font-bold">アクセス解析について</h2>
      <GoogleAnalytics />
    </div>
  )
}

type ContactProps = {
  className?: string
}
const Contact = ({ className = "" }: ContactProps) => {
  return (
    <div className={className}>
      <h2 className="mb-5 text-xl font-bold">お問い合わせ</h2>
      <p>
        下記のいずれかにご連絡ください。
        <br />
        ・<Link label="Email" url="mailto:s.datsukan@gmail.com" />
        <br />
        ・<Link label="Twitter" url="https://twitter.com/datsukan_tech" />
      </p>
    </div>
  )
}

export const About = ({ location }: PageProps) => {
  return (
    <DefaultLayout location={location}>
      <Seo title="About" description="datsukan blogについての概要です。" />

      <div className="leading-relaxed">
        <h1 className="mb-16 text-2xl font-bold">datsukan blogについて</h1>
        <Ad />
        <Analysis className="mt-14" />
        <Contact className="mt-14" />
      </div>
    </DefaultLayout>
  )
}

export default About

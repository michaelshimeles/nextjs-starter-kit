import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "../ui/button";

export default function MarketingCards() {

  const cardInfo = [
    {
      title: "Beacon",
      description: "Automate and streamline your content tracking with Beacon, effortlessly keeping tabs on competitor updates and new content"
    },
    {
      title: "SEO Heisting",
      description: "Leverage SEO Heisting to smartly repurpose competitor insights, enhancing your site's traffic and content relevance."
    },
    {
      title: "AI Article Generation",
      description: "Generate compelling, high-quality articles tailored to your specifications with our advanced article generation tool.      "
    },
    {
      title: "Advanced Logic Layers",
      description: "Enhance content accuracy and depth with our three-tiered logic layers, ensuring data-driven, contextually relevant articles.      "
    },
    {
      title: "Intuitive User Interface",
      description: "Navigate content creation effortlessly with our Intuitive User Interface, designed for optimal user experience and efficient management of multiple projects."
    },
    {
      title: "Custom Content Structuring",
      description: "Tailor every aspect of your content with our Custom Content Structuring, enabling detailed control over titles and subheadings for perfectly organized articles."
    },
    {
      title: "Precision Internal Linking",
      description: "Boost your SEO efforts with Precision Internal Linking, smartly weaving related articles within your site to enhance user engagement and site authority."
    },
    {
      title: "Multi-Category Classification",
      description: "Simplify content organization with Multi-Category Classification, allowing you to assign and manage article topics seamlessly for better content strategy."
    }
  ]

  return (
    <div className="flex flex-col justify-center items-center p-4 max-w-[1300px]">
      <div>
        <h1 className="scroll-m-20 text-3xl sm:text-xl md:text-3xl font-semibold tracking-tight lg:text-4xl text-center max-w-[700px]">
          Not &apos;another&apos; gpt wrapper
        </h1>
        <p className="mx-auto max-w-[500px] text-gray-500 md:text-lg text-center mt-2 dark:text-gray-400">
          RankBoost AI stands out from regular GPT wrapper article writers with its articulate design to boost your website&apos;s traffic by crafting top-notch articles.
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center w-full mt-[4rem] gap-4">
        {
          cardInfo?.map((info, index) => (
            <Card className="max-w-[300px] hover:drop-shadow-xl" key={index}>
              <CardHeader>
                <CardTitle>{info?.title}</CardTitle>
                <CardDescription>{info?.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}

      </div>
    </div>
  )
}
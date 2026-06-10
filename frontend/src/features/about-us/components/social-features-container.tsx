import { GitBranch, Repeat, Share2, UserPlus } from "lucide-react";
import { FeatureBox } from "./boxes/feature-box"

const socialFeatures = [
    {
        icon: UserPlus,
        title: "Follow Writers",
        desc: "Follow people whose ideas, style, or expertise you care about.",
    },
    {
        icon: Repeat,
        title: "Get Followed",
        desc: "Build your audience as readers discover and follow your work.",
    },
    {
        icon: GitBranch,
        title: "Collaborative Writing",
        desc: "Work together on the same article with other writers and publish as a team.",
    },
    {
        icon: Share2,
        title: "Shared Publishing",
        desc: "Collaborators can draft, revise, and publish a unified article together.",
    },
];

function SocialFeaturesContainer() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {socialFeatures.map((feature) => (
                <FeatureBox {...feature} key={feature.title} />
            ))}
        </div>
    )
}

export default SocialFeaturesContainer
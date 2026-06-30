import { InfoListItem } from "../components/ui/InfoListCard";
import { AppCarouselItem } from "../components/ui/AppCarousel";

export const homeInfoListItems: InfoListItem[] = [
    {
        title: "Lifestyle matching",
        description: "We match pets to your home, routine and experience.",
        iconName: "person-outline",
        backgroundColor: "#DDEFC6",
    },
    {
        title: "Adoption first",
        description: "PetPath prioritises shelters and responsible rehoming before breeders.",
        iconName: "home-outline",
        backgroundColor: "#FFF0A8",
    },
    {
        title: "Verified listings",
        description:
            "We verify charities and all pet listings so you know you're finding pets from trusted sources.",
        iconName: "shield-checkmark-outline",
        backgroundColor: "#CFF3DD",
    },
    {
        title: "Lighten the load",
        description:
            "Together we help shelters lighten the load of pets needing suitable, responsible homes.",
        iconName: "leaf-outline",
        backgroundColor: "#E9FCD0",
    },
    {
        title: "Adoption confidence",
        description:
            "PetPath makes it easy to understand each pet’s needs before you decide, so you can adopt with confidence.",
        iconName: "checkmark-circle-outline",
        backgroundColor: "#F2D9ED",
    },
];

export const homeCarouselItems: AppCarouselItem[] = [
    {
        title: "Prepare your home",
        description:
            "Learn what to consider before bringing a new pet into your home.",
        image: require("../../assets/images/resources/cat-care-info.jpg"),
        url: "https://www.animalfriends.co.uk/dog/dog-blog/preparing-your-new-home-and-garden-for-a-new-pet/",
        tag: "Pet-proof",
    },
    {
        title: "Understand pet insurance",
        description:
            "Learn how insurance can help with unexpected vet bills and long-term care.",
        image: require("../../assets/images/resources/pet-insurance.jpg"),
        url: "https://www.braemarvetclinic.co.uk/index.php/pet-insurance/insurance-general",
        tag: "Insurance",
    },
    {
        title: "Training and behaviour",
        description:
            "Find useful guidance on behaviour, enrichment and positive reinforcement.",
        image: require("../../assets/images/resources/pet-training.jpg"),
        url: "https://online-learning-college.com/knowledge-hub/animal-care/understanding-animal-training-positive-reinforcement-techniques/",
        tag: "Advice",
    },
    {
        title: "Guinea pig dictionary",
        description:
            "Get useful information on understanding guinea pig's needs. ",
        image: require("../../assets/images/resources/guinea-pig.jpeg"),
        url: "https://www.dogstrust.org.uk/dog-advice/understanding-your-dog/finding-behaviour-and-training-support",
        tag: "Pigs",
    },
    {
        title: "Behaviourist or trainer?",
        description:
            "Discover the difference between a trainer and behaviourist so you know who to approach.",
        image: require("../../assets/images/resources/trainer.jpg"),
        url: "https://www.dogstrust.org.uk/dog-advice/understanding-your-dog/finding-behaviour-and-training-support",
        tag: "Training",
    },
];
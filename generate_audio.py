import asyncio
import edge_tts
import os

VOICE = "en-IN-NeerjaNeural"

ACTS = {
    "act1_pain": (
        "Online fashion shopping has made beautiful ethnic wear accessible to everyone. "
        "But one question still creates uncertainty: will the outfit actually fit? "
        "Priya finds a beautiful kurta, selects size M, and places her order. "
        "But when it arrives, the fit is uncomfortable. The shoulders and bust are too tight. "
        "She requests a return. "
        "For Priya, this is a disappointing experience. "
        "For the business, it means additional shipping costs, reverse logistics, inventory handling, "
        "and potentially selling the returned product again at a discount. "
        "Traditional customer service reacts after the problem happens. "
        "But what if we could prevent the wrong fit before the customer even places the order?"
    ),
    "act2_agent": (
        "Meet FitBack-AI, an intelligent customer-service agent designed to prevent, recover, and learn from fit-related returns. "
        "Before purchase, FitBack-AI understands the customer's fit preferences, retrieves the product's size chart, and compares available measurements. "
        "It provides a recommendation with an explanation, helping customers make more informed decisions. "
        "The customer remains free to choose another size. "
        "If a fit problem still occurs, FitBack-AI helps recover the customer experience. "
        "It checks the order, verifies the applicable policy, checks inventory, and offers an eligible exchange. "
        "With the customer's permission, it can initiate the appropriate workflow. "
        "The objective is to retain the sale wherever possible while respecting the customer's choice. "
        "Finally, FitBack-AI learns from every return. "
        "It identifies recurring product-level fit problems and prepares useful insights for the brand's quality team."
    ),
    "act3_hood": (
        "FitBack-AI uses Retrieval-Augmented Generation, also known as RAG. "
        "RAG allows the agent to search the brand's own documents before generating an answer. "
        "These documents include product catalogues, size charts, fabric descriptions, customer feedback, and return policies. "
        "When Priya asks which size she should choose, the agent retrieves the relevant information and uses it to provide a more grounded recommendation. "
        "This reduces reliance on unsupported guesses. "
        "RAG helps FitBack-AI retrieve the right knowledge. MCP helps it connect with the business systems needed to take action. "
        "Through standardised tool connections, the agent can check orders, retrieve inventory information, verify exchange policies, and initiate permitted workflows. "
        "This is what makes it an AI agent rather than simply a chatbot. "
        "Some integrations in this prototype may be simulated using sample data. "
        "These must be clearly labelled as simulated rather than presented as live production connections."
    ),
    "act4_wrong": (
        "But AI systems are not perfect. "
        "While analysing sample return records, FitBack-AI identifies a pattern of upper-body fit complaints and proposes a size-chart correction. "
        "However, the agent makes an incorrect assumption about the measurements. "
        "A human quality manager reviews the underlying information, catches the issue, and rejects the proposed change. "
        "FitBack-AI never automatically publishes production size-chart changes. "
        "It supports human decisions. It does not replace human accountability."
    ),
    "act5_normal": (
        "With FitBack-AI, customers make more informed size decisions, while businesses gain better visibility into fit-related problems. "
        "Consider an illustrative scenario. "
        "If 30 size-related returns could be prevented, at an estimated logistics and handling cost of 250 rupees per return, "
        "the business could save 7,500 rupees. "
        "If another 20 exchanges help retain orders with an average order value of 1,500 rupees, "
        "that represents 30,000 rupees in gross order value retained. "
        "These figures are illustrative estimates, not measured results. "
        "The bigger opportunity is continuous improvement: prevent the wrong fit, recover the sale, and learn from every return."
    )
}

async def generate():
    output_dir = os.path.join("video_production", "audio")
    os.makedirs(output_dir, exist_ok=True)
    
    for act_name, text in ACTS.items():
        filepath = os.path.join(output_dir, f"{act_name}.mp3")
        print(f"Generating voiceover for {act_name}...")
        communicate = edge_tts.Communicate(text, VOICE, rate="-2%")
        await communicate.save(filepath)
        print(f"Saved: {filepath}")

if __name__ == "__main__":
    asyncio.run(generate())

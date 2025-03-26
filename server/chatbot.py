import sys
from datasets import load_dataset
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# ✅ Ensure UTF-8 encoding for proper output formatting
sys.stdout.reconfigure(encoding='utf-8', newline='\n')

# ✅ Load dataset safely
try:
    ds = load_dataset("KisanVaani/agriculture-qa-english-only")
except Exception as e:
    print(f"Error loading dataset: {str(e)}", file=sys.stderr)
    sys.exit(1)  # Exit with error

# ✅ Extract questions and answers properly
questions = [entry.get("question", "No question available.") for entry in ds["train"]]
answers = [
    " ".join(entry.get("answers", [])).strip().replace("  ", " ") if entry.get("answers") else "No answer available."
    for entry in ds["train"]
]

# ✅ Convert text to numerical representation
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(questions)

def get_answer(user_input):
    """Finds the best answer for the given user query."""
    user_vec = vectorizer.transform([user_input])
    scores = cosine_similarity(user_vec, X)
    
    best_match = scores.argmax()
    confidence_score = scores[0][best_match]

    matched_question = questions[best_match]
    matched_answer = answers[best_match]

    # ✅ Debugging info to stderr (not visible in bot response)
    print(f"\n🔍 Debug: Best match confidence score: {confidence_score:.2f}", file=sys.stderr)
    print(f"📝 Matched Question: {matched_question}\n", file=sys.stderr)

    # ✅ Set confidence threshold to avoid irrelevant answers
    if confidence_score < 0.2:
        return "Sorry, I don't have an answer for that. Try rephrasing!"
    
    # ✅ Fix: Remove any unexpected spaces or formatting issues
    return " ".join(matched_answer.split())  # Normalize spaces

if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_query = " ".join(sys.argv[1:])  # ✅ Read input from command-line arguments
        print(get_answer(user_query), flush=True)  # ✅ Ensure clean output
    else:
        print("Error: No input received.", file=sys.stderr)  # ✅ Print errors to stderr

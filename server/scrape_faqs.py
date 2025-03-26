from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import json
import time

# Setup Selenium WebDriver
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # Run without opening browser
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Open the FAQ page
URL = "https://www.agrifarming.in/frequently-asked-questions-about-agriculture"
driver.get(URL)

time.sleep(5)  # Wait for elements to load

# Extract FAQs
faqs = []
faq_elements = driver.find_elements(By.TAG_NAME, "h3")  # Modify if needed

for faq in faq_elements:
    question = faq.text.strip()
    print(f"🔹 Found Question: {question}")  # Debugging

    try:
        # Updated: Looking for paragraph (<p>), div, or span elements that might contain the answer
        answer_elements = faq.find_elements(By.XPATH, "following-sibling::*[self::p or self::div or self::span][position() <= 5]")

        # Extract full text
        answer = " ".join([elem.text.strip() for elem in answer_elements if elem.text.strip()])

        if not answer or len(answer) < 15:  # Avoid very short/incomplete answers
            print("⚠️ Answer might be incomplete or missing.")
        else:
            print(f"✅ Answer Found: {answer[:100]}...")  # Preview first 100 chars

    except Exception as e:
        answer = "No answer found"
        print(f"❌ Error extracting answer: {e}")

    if question and answer and answer != "No answer found":
        faqs.append({"question": question, "answer": answer})

print(f"✅ Scraped {len(faqs)} FAQs")  # Debugging

# Save data to JSON
with open("farm_faqs.json", "w", encoding="utf-8") as file:
    json.dump(faqs, file, indent=4, ensure_ascii=False)

print(f"✅ Scraping Complete! {len(faqs)} FAQs saved to farm_faqs.json")

driver.quit()

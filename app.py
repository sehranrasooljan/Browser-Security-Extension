from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/check_phishing', methods=['POST'])
def check_phishing():
    url = request.json.get('url')
    # Analyze the URL for phishing characteristics
    # For simplicity, let's assume we just check if the URL contains "phishing"
    is_phishing = "phishing" in url
    result = {"is_phishing": is_phishing}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)

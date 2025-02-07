# server.py
from flask import Flask, request, jsonify
from get_transcript import generate_transcript
from flask_cors import CORS  # enable cors support
app = Flask(__name__)
CORS(app)
@app.route('/transcript', methods=['GET'])
def get_transcript():
    video_id = request.args.get('video_id')
    if not video_id:
        return jsonify({'error': 'Missing video_id'}), 400
    
    transcript = generate_transcript(video_id)
    return jsonify({'transcript': transcript})

if __name__ == '__main__':
    app.run(debug=True)

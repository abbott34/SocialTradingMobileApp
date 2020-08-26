import uuid
from datetime import datetime
from flask import (
    Flask,
    request,
    abort,
    jsonify
)
app = Flask(__name__)

users = [] 
chats = [] # Hold message IDs
login_info = dict()
messages_dict = dict()

@app.route("/")
def hello():
    return "hello\n"

# @app.route("/login", methods = ["POST"])
# def login():
#     username = request.get_json(force=True)
#     user_taken = username in users
#     if user_taken:
#         abort(401)
#     else:
#         users.append(username)
#         return jsonify({
#             'status': 'OK',
#             'message': 'Succesfully logged in',
#         })
#     pass

@app.route("/login", methods = ["POST"])
def login():
    username = request.json.get('username', None)
    #username = request.get_json(force=True)
    # password = request.json.get('password', None)
    # password = request.get_json(force=True)
    #timestamp = datetime.now()
    person_id = str(uuid.uuid4())
    

    #login_info[person_id] = {"username":username, "password":password, "timestamp":timestamp, "id":person_id}
    login_info[person_id] = {"username":username, "id":person_id}
    user_taken = username in users
    if user_taken:
        abort(401)
    else:
        users.append(username)
        return jsonify(login_info)

    pass

@app.route("/message", methods = ["POST"])
def sendMessage():
    sender = request.json.get('sender', None)
    recipient = request.json.get('recipient', None)
    message = request.json.get('message', None)
    timestamp = datetime.now()
    person_id = str(uuid.uuid4())

    messages_dict[person_id] = {'recipient':recipient, "message":message, "timestamp":timestamp, "sender":sender}
    chats.append(person_id)
    return jsonify(messages_dict)
    
@app.route("/recieve/<last_id>", methods = ["GET"])
def recieveMessage(last_id):
    if len(chats) == 0:
        return "No Chats"

    index = get_next_index(last_id) if last_id else 0
    ids_to_return = chats[index:]
    results = map(lambda x: messages_dict[x], ids_to_return)
    return jsonify(list(results))

@app.route("/update/<last_id>", methods = ["GET"])
def updates(last_id):
    index = get_next_index(last_id) if last_id else 0
    update_data = {'new messages':False}
    if index < len(chats):
        update_data['new messages'] = True
    return jsonify(update_data)

def get_next_index(last_id):
    try:
        index = chats.index(last_id) + 1
        return index
    except ValueError as e:
        abort(400)


if __name__ == '__main__':
    app.run(debug=True, host = '0.0.0.0')


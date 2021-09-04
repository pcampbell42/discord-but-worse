json.extract! user, :id, :email, :username, :username_id
json.photoUrl (user.photo.attached? ? url_for(user.photo) : "noPhoto")
json.extract! server, :id, :name, :owner_id, :invite_code, :created_at, :updated_at
json.photoUrl (server.photo.attached? ? url_for(server.photo) : "noPhoto")

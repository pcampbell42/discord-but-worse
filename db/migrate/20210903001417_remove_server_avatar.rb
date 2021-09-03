class RemoveServerAvatar < ActiveRecord::Migration[5.2]
  def change
    remove_column :servers, :avatar
  end
end

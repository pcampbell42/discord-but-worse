class User1And2Hidden < ActiveRecord::Migration[5.2]
  def change
    remove_column :direct_messages, :hidden
    add_column :direct_messages, :user1_hidden, :boolean, null: false
    add_column :direct_messages, :user2_hidden, :boolean, null: false
  end
end

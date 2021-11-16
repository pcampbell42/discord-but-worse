class AddMessagePinned < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :pinned, :boolean, null: false
  end
end

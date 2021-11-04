class AddDmHidden < ActiveRecord::Migration[5.2]
  def change
    add_column :direct_messages, :hidden, :boolean, null: false
  end
end

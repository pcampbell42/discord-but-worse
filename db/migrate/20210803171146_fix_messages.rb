class FixMessages < ActiveRecord::Migration[5.2]
  def change
    rename_column :messages, :auther_id, :author_id
  end
end

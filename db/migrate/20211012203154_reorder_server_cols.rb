class ReorderServerCols < ActiveRecord::Migration[5.2]
  def change
    change_column :servers, :invite_code, :string, after: :owner_id
  end
end

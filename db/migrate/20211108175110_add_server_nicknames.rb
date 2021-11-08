class AddServerNicknames < ActiveRecord::Migration[5.2]
  def change
    add_column :memberships, :nickname, :string, null: false
  end
end

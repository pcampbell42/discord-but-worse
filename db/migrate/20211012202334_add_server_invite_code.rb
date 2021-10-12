class AddServerInviteCode < ActiveRecord::Migration[5.2]
  def change
    add_column :servers, :invite_code, :string, null: false
  end
end

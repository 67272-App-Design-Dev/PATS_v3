class AddPasswordTokensToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :password_reset_token, :string
    add_column :users, :password_reset_sent_at, :datetime
    add_column :users, :active_after, :datetime
  end
end

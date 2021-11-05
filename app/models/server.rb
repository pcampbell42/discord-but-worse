# == Schema Information
#
# Table name: servers
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  owner_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  invite_code :string           not null
#
class Server < ApplicationRecord

    #--------------------- Validations ---------------------

    validates :name, :owner_id, :invite_code, presence: true
    validates :name, length: { minimum: 2, maximum: 30 }


    #--------------------- After Initialize ---------------------

    after_initialize :generate_invite_code

    def generate_invite_code
        self.invite_code ||= SecureRandom::urlsafe_base64
        # Add logic for checking if invite code is taken here
    end


    #--------------------- Associations ---------------------

    belongs_to :owner,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :User

    has_many :memberships,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :Membership,
        dependent: :destroy
    
    has_many :members,
        through: :memberships,
        source: :member

    has_many :text_channels,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :TextChannel,
        dependent: :destroy

    has_one_attached :photo

end

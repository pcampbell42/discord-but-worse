# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  owner_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Server < ApplicationRecord

    #--------------------- Validations ---------------------

    validates :name, :owner_id, presence: true
    validates :name, length: { minimum: 2, maximum: 30 }


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

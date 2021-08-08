# == Schema Information
#
# Table name: messages
#
#  id               :bigint           not null, primary key
#  body             :text             not null
#  author_id        :integer          not null
#  messageable_type :string           not null
#  messageable_id   :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Message < ApplicationRecord

    #--------------------- Validations ---------------------

    validates :body, :author_id, :messageable_id, :messageable_type, presence: true


    #--------------------- Placeholder after initialize ---------------------

    after_initialize :placeholder_set_messageable

    def placeholder_set_messageable
        self.messageable_id ||= 1
        self.messageable_type ||= "qwe"
    end


    #--------------------- Relations ---------------------

    belongs_to :author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User

end

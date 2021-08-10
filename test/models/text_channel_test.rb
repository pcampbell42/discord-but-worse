# == Schema Information
#
# Table name: text_channels
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  server_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'test_helper'

class TextChannelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

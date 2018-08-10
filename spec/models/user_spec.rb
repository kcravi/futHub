require 'rails_helper'

RSpec.describe User, type: :model do
  describe "#admin?" do
    it "is not an admin if the role is not admin" do
      user = FactoryBot.create(:user, role: "member", admin: false)
      expect(user.admin?).to eq(false)
    end

    it "is an admin if the role is admin and admin is true" do
      user = FactoryBot.create(:user, role: "admin", admin: true)
      expect(user.admin?).to eq(true)
    end
  end
end

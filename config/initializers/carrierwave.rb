require 'carrierwave/orm/activerecord'

CarrierWave.configure do |config|
  if !Rails.env.test?
    config.fog_credentials = {
      provider: "AWS",
      aws_access_key_id: ENV["AWS_ACCESS_KEY_ID"],
      aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
      region: ENV["AWS_REGION"]
    }
    # config.fog_directory  = ENV["S3_BUCKET"]
    # config.fog_public = false

    if Rails.env.production?
      config.fog_directory  = ENV["S3_BUCKET_PROD"]
    else
      config.fog_directory  = ENV["S3_BUCKET_DEV"]
    end
  end
end

module CarrierWave
  module MiniMagick
    def quality(percentage)
      manipulate! do |img|
        img.quality(percentage.to_s)
        img = yield(img) if block_given?
        img
      end
    end
  end
end

#!/bin/env ruby
# frozen_string_literal: true

require 'every_politician_scraper/scraper_data'
require 'pry'

class MemberList
  class Member
    field :name do
      lines_matching('Honourable').first.to_s
                                  .gsub(/.*Honourable/, '') # remove anything up to and including the 'Honourable'
                                  .gsub(/Minister.*/, '') # remove any Minister info on the same line
                                  .tidy
    end

    field :position do
      # We need to remove the ones with names, but also get the PM!
      lines_matching('Minister').map do |line|
        if line.include? 'Honourable'
          line[/(Minister.*)/, 1].tidy
        else
          line.tidy
        end
      end
    end

    private

    # The layout is so inconsistent that the only common factor is that
    # each 'type' of information appears on its own line (other than
    # some cases where both name and ministry are on the same line!)
    # So we can't really process this as HTML, but only as text

    def lines
      noko.to_html.lines
    end

    def lines_matching(str)
      lines.select { |line| line.include? str }.map { |line| line.gsub(/<[^>]+>/, '') }
    end
  end

  class Members
    def member_container
      noko.css('.mce-item-table').xpath('.//tr[td[@align="left"]]')
    end
  end
end

file = Pathname.new 'html/official.html'
puts EveryPoliticianScraper::FileData.new(file).csv

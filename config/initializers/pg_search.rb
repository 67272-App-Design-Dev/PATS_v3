# Setting up multisearch to handle different kinds of searching
# :dmetaphone => phonetic searching using fuzzystrmatch extension
# :trigram    => based on trigram matching
# :tsearch    => using postgres' tsvector for full-text searching

# PgSearch.multisearch_options = {
#   :using => [:dmetaphone, :trigram, :tsearch]
# }
PgSearch.multisearch_options = {
    :using => [:dmetaphone]
  }
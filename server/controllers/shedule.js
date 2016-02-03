Meteor.setInterval(function() {
  new fibers(function() {
    _project.find({
      worker: "schedule"
    }).fetch().forEach(function(item) {
      if (6 < moment.duration(moment().diff(moment(item.time))).asHours()) {
        item.torrent.forEach(function(torrent_id) {
          var torrent = _torrent.findOne({
            _id: torrent_id
          });

          if (torrent && item.within < moment.duration(moment().diff(moment(torrent.time))).asMonths()) {
            _project.update({
              _id: item._id
            }, {
              $pull: {
                torrent: torrent_id
              }
            });
          }
        });

        _project.update({
          _id: item._id
        }, {
          $set: {
            time: moment().format()
          }
        });

        if (!_worker.findOne({
            project: item._id,
            status: "",
            type: item.worker
          })) {
          _worker.insert({
            project: item._id,
            status: "",
            time_insert: moment().format(),
            type: item.worker,
            user: item.user
          });
        }
      }
    });
  }).run();
}, 1000 * 60 * 15);

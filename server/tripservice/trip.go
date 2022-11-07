package trip

import (
	"context"
	trippb "coolcar/proto/gen/go"
)

// type TripServicesServer interface {
// 	GetTrip(context.Context, *GetTripRequest) (*GetTripResponse, error)
// 	mustEmbedUnimplementedTripServicesServer()
// }

// Service implements trip service.
type Service struct {
	trippb.UnimplementedTripServiceServer
	// mustEmbedUnimplementedTripServicesServer()
}

func (*Service) GetTrip(c context.Context, req *trippb.GetTripRequest) (*trippb.GetTripResponse, error) {
	return &trippb.GetTripResponse{
		Id: req.Id,
		Trip: &trippb.Trip{
			Start:       "abc",
			End:         "def",
			DurationSec: 3600,
			FeeCent:     10000,
			StartPos: &trippb.Location{
				Latitude:  99,
				Longitude: 88,
			},
			EndPos: &trippb.Location{
				Latitude:  110,
				Longitude: 112,
			},
			PathLocations: []*trippb.Location{
				{
					Latitude:  98,
					Longitude: 32,
				},
				{
					Latitude:  99,
					Longitude: 33,
				},
			},

			Status: trippb.TripStatus_FINISHED,
		},
	}, nil
}

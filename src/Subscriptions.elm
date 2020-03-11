module Subscriptions exposing (subscriptions)
import Model
import Msg
import Bandcamp
import FileSystem
import Json.Decode as Decode

subscriptions : Model.Model -> Sub Msg.Msg
subscriptions model =
    Sub.batch
        [ Bandcamp.subscriptions model.bandcamp |> Sub.map Msg.BandcampMsg
        , filesystemSub
        ]



filesystemSub : Sub Msg.Msg
filesystemSub =
    let
        captureFileSystemScan val =
            val
            |> Decode.decodeValue (Decode.list FileSystem.decodeFileRef)
            |> Msg.FilesRead
    in
      FileSystem.paths_scanned captureFileSystemScan

package controllers

import play.api.mvc._
import play.api.libs.json.Json
import play.api.libs.concurrent.Execution.Implicits._
import models._
import reactivemongo.bson.BSONObjectID
import scala.concurrent.Future

import org.joda.time.DateTime
import org.joda.time.DateTimeZone.UTC

import play.api.Play.current
import play.api.libs.concurrent.Execution.Implicits.defaultContext

import reactivemongo.api._
import reactivemongo.api.collections.default.BSONCollection
import reactivemongo.bson.{BSONDateTime, BSONDocument, BSONDocumentReader, BSONDocumentWriter, BSONObjectID}
import reactivemongo.core.commands.LastError

object PhantomController extends Controller {

	val mongoDriver = new MongoDriver
	val mongoConnection = mongoDriver.connection(List("localhost"))
	val mongoDb = mongoConnection("matt")
	val collection : BSONCollection = mongoDb.collection("phantoms")

	def index = Action {
		Ok(views.html.index())
	}

	def show(example: String) = Action { implicit request =>
		example match {
			case "cat"     => Ok(views.html.cat())
			case "click"   => Ok(views.html.click())
			case "circle1" => Ok(views.html.circle1())
			case "circle2" => Ok(views.html.circle2())
			case _         => Ok(views.html.index())
		}
	}

	def edit(id: String) = Action.async {
		val selector = BSONDocument("_id" -> id)
		val foundPhantom = collection.find(selector).one[Phantom]
		foundPhantom.map { phantom => 
			phantom match {
				case Some(p) => Ok(views.html.edit(p))
				case None => Redirect(routes.PhantomController.index)
			}
		}
	}

	def update (id: String) = Action { implicit request =>
		val params = request.body.asFormUrlEncoded.get
		val message = params("message")(0).toString
		val selector = BSONDocument("_id" -> id)
		val modifier = BSONDocument(
			"$set" -> BSONDocument(
				"message"        -> message,
				"whenUpdated" -> BSONDateTime(DateTime.now(UTC).getMillis)
			)
		)
		val futureUpdate = collection.update(selector, modifier, multi = false)
		Redirect(routes.PhantomController.index)
	}

	def delete (id: String) = Action {
		val selector = BSONDocument("_id" -> BSONObjectID(id))
		collection.remove(selector, firstMatchOnly = true)
		Redirect(routes.PhantomController.index)
	}
}